import { Logs, User, UserRoundCheck } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card rounded-md p-5 bg-background relative overflow-hidden">
        <span className="text-sm">Total Employees</span>
        <h1 className="text-4xl mt-2">00</h1>

        {/* rotated background */}
        <div className="bg-blue-100/70 dark:bg-blue-500/10 rounded-bl-2xl absolute top-10 -right-12 w-24 h-24 rotate-50">
          {/* center icon */}
          <div className="absolute inset-0 flex items-center justify-center -rotate-50 -left-10 -bottom-5">
            <User size={35} className="text-blue-500" />
          </div>
        </div>
      </div>

      <div className="card rounded-md p-5 bg-background relative overflow-hidden">
        <span className="text-sm">Total Blogs</span>
        <h1 className="text-4xl mt-2">00</h1>
        <div className="bg-red-100/70 dark:bg-red-500/10 rounded-bl-2xl absolute top-10 -right-12 w-24 h-24 rotate-50">
          {/* center icon */}
          <div className="absolute inset-0 flex items-center justify-center -rotate-50 -left-10 -bottom-5">
            <Logs size={35} className="text-red-500" />
          </div>
        </div>
      </div>
      <div className="card rounded-md p-5 bg-background relative overflow-hidden">
        <span className="text-sm">Total Roles</span>
        <h1 className="text-4xl mt-2">00</h1>
        <div className="bg-yellow-100/70 dark:bg-yellow-500/10 rounded-bl-2xl absolute top-10 -right-12 w-24 h-24 rotate-50">
          {/* center icon */}
          <div className="absolute inset-0 flex items-center justify-center -rotate-50 -left-10 -bottom-5">
            <UserRoundCheck size={35} className="text-yellow-500" />
          </div>
        </div>
      </div>
      <div className="card rounded-md p-5 bg-background relative overflow-hidden">
        <span className="text-sm">Total Permissions</span>
        <h1 className="text-4xl mt-2">00</h1>
        <div className="bg-green-100/70 dark:bg-green-500/10 rounded-bl-2xl absolute top-10 -right-12 w-24 h-24 rotate-50">
          {/* center icon */}
          <div className="absolute inset-0 flex items-center justify-center -rotate-50 -left-10 -bottom-5">
            <User size={35} className="text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
