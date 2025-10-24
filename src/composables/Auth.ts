import { ref, reactive } from "vue"

interface User {
  id: string
  email: string
  password: string
}

interface AuthContextType {
  user: Omit<User, "password"> | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
}

const DEMO_USER: User = { id: "1", email: "test@example.com", password: "Password123!" }
const AUTO_LOGIN = false // true for automatic demo sign-in

// Only store id & email in reactive state
const user = ref<Omit<User, "password"> | null>(null)

// Load session from localStorage
const session = localStorage.getItem("ticketapp_session")
if (session) {
  try {
    user.value = JSON.parse(session)
  } catch {
    localStorage.removeItem("ticketapp_session")
  }
}

// "Database" helpers
const getUsers = (): User[] => JSON.parse(localStorage.getItem("ticketapp_users") || "[]")
const saveUsers = (users: User[]) => localStorage.setItem("ticketapp_users", JSON.stringify(users))

// Pre-seed demo user
const users = getUsers()
if (!users.find((u) => u.email === DEMO_USER.email)) {
  saveUsers([...users, DEMO_USER])
}

// Auto-login demo user
if (AUTO_LOGIN && !localStorage.getItem("ticketapp_session")) {
  const sessionUser = { id: DEMO_USER.id, email: DEMO_USER.email }
  localStorage.setItem("ticketapp_session", JSON.stringify(sessionUser))
  user.value = sessionUser
}

// Auth methods
const login = async (email: string, password: string) => {
  const users = getUsers()
  const existingUser = users.find(u => u.email === email)

  if (!existingUser) throw new Error("No account found with this email.")
  if (existingUser.password !== password) throw new Error("Invalid password. Please try again.")

  const sessionUser = { id: existingUser.id, email: existingUser.email }
  user.value = sessionUser
  localStorage.setItem("ticketapp_session", JSON.stringify(sessionUser))
}

const signup = async (email: string, password: string) => {
  const users = getUsers()
  if (users.find(u => u.email === email)) throw new Error("This email is already registered.")

  const newUser: User = { id: Date.now().toString(), email, password }
  saveUsers([...users, newUser])

  const sessionUser = { id: newUser.id, email: newUser.email }
  user.value = sessionUser
  localStorage.setItem("ticketapp_session", JSON.stringify(sessionUser))
}

const logout = () => {
  user.value = null
  localStorage.removeItem("ticketapp_session")
}

// Reactive readonly auth context
export const auth = reactive<AuthContextType>({
  get user() {
    return user.value
  },
  get isAuthenticated() {
    return !!user.value
  },
  login,
  signup,
  logout,
})
