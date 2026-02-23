import { Logs, User, UserRoundCheck } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-1">
<div className="group relative rounded-xl p-[1px] bg-gradient-to-br from-blue-500/40 to-transparent">

  {/* card */}
  <div className="relative rounded-xl p-6 bg-white dark:bg-gray-900 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:shadow-xl">

    {/* content */}
    <span className="text-sm text-gray-500 dark:text-gray-400">
      Total Employees
    </span>

    <h1 className="text-4xl font-semibold mt-2 text-gray-900 dark:text-white">
      00
    </h1>

    {/* floating icon */}
    <div className="absolute -top-6 -right-6 w-28 h-28
      bg-blue-500/10 dark:bg-blue-500/20
      rounded-full flex items-center justify-center
      transition-transform duration-300 group-hover:scale-110">

      <User size={40} className="text-blue-500 dark:text-blue-400" />
    </div>

    {/* subtle gradient glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none
      bg-gradient-to-br from-blue-500/10 to-transparent" />

  </div>
</div>


      <div className="bg-slate-200 dark:bg-gray-200/10 p-1 rounded-md ">
        <div className="card rounded-md p-5 bg-background dark:bg-gray-800  relative overflow-hidden">
          <span className="text-sm">Total Blogs</span>
          <h1 className="text-4xl mt-2">00</h1>
          <div className="bg-red-100/70 dark:bg-red-500/20 rounded-bl-2xl absolute top-10 -right-12 w-24 h-24 rotate-50">
            <div className="absolute inset-0 flex items-center justify-center -rotate-50 -left-10 -bottom-5">
              <Logs size={35} className="text-red-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 dark:bg-gray-200/10 p-1 rounded-md ">
        <div className="card rounded-md p-5 bg-background dark:bg-gray-800  relative overflow-hidden">
          <span className="text-sm">Total Roles</span>
          <h1 className="text-4xl mt-2">00</h1>
          <div className="bg-yellow-100/70 dark:bg-yellow-500/20 rounded-bl-2xl absolute top-10 -right-12 w-24 h-24 rotate-50">
            <div className="absolute inset-0 flex items-center justify-center -rotate-50 -left-10 -bottom-5">
              <UserRoundCheck size={35} className="text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 dark:bg-gray-200/10 p-1 rounded-md ">
        <div className="card rounded-md p-5 bg-background dark:bg-gray-800 relative overflow-hidden">
          <span className="text-sm">Total Permissions</span>
          <h1 className="text-4xl mt-2">00</h1>
          <div className="bg-green-100/70 dark:bg-green-500/20 rounded-bl-2xl absolute top-10 -right-12 w-24 h-24 rotate-50">
            <div className="absolute inset-0 flex items-center justify-center -rotate-50 -left-10 -bottom-5">
              <User size={35} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
