import { ACCOUNT_TYPE } from "../utils/constants"

// `icon` is a react-icons/lu export name; `slug` is used by the product tour to find the link.
export const sidebarLinks = [
  { id: 1, name: "My Profile", slug: "my-profile", path: "/dashboard/my-profile", icon: "LuUser" },
  { id: 2, name: "Dashboard", slug: "instructor", path: "/dashboard/instructor", type: ACCOUNT_TYPE.INSTRUCTOR, icon: "LuLayoutDashboard" },
  { id: 3, name: "My Courses", slug: "my-courses", path: "/dashboard/my-courses", type: ACCOUNT_TYPE.INSTRUCTOR, icon: "LuLibrary" },
  { id: 4, name: "Add Course", slug: "add-course", path: "/dashboard/add-course", type: ACCOUNT_TYPE.INSTRUCTOR, icon: "LuPlusSquare" },
  { id: 5, name: "Enrolled Courses", slug: "enrolled-courses", path: "/dashboard/enrolled-courses", type: ACCOUNT_TYPE.STUDENT, icon: "LuGraduationCap" },
  { id: 6, name: "Cart", slug: "cart", path: "/dashboard/cart", type: ACCOUNT_TYPE.STUDENT, icon: "LuShoppingCart" },
]

// page titles for the dashboard header
export const pageTitles = {
  "/dashboard/my-profile": "My Profile",
  "/dashboard/settings": "Settings",
  "/dashboard/instructor": "Dashboard",
  "/dashboard/my-courses": "My Courses",
  "/dashboard/add-course": "Add Course",
  "/dashboard/enrolled-courses": "Enrolled Courses",
  "/dashboard/cart": "Cart",
}
