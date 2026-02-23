const StatCard = ({ title, value, icon: Icon, color = "blue" }) => {
  const styles = {
    blue: {
      border: "from-blue-500/40",
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      text: "text-blue-500 dark:text-blue-400",
      glow: "from-blue-500/10",
    },
    red: {
      border: "from-red-500/40",
      bg: "bg-red-500/10 dark:bg-red-500/20",
      text: "text-red-500 dark:text-red-400",
      glow: "from-red-500/10",
    },
    yellow: {
      border: "from-yellow-500/40",
      bg: "bg-yellow-500/10 dark:bg-yellow-500/20",
      text: "text-yellow-500 dark:text-yellow-400",
      glow: "from-yellow-500/10",
    },
    green: {
      border: "from-green-500/40",
      bg: "bg-green-500/10 dark:bg-green-500/20",
      text: "text-green-500 dark:text-green-400",
      glow: "from-green-500/10",
    },
  };

  const s = styles[color];

  return (
    <div className={`group relative rounded-xl p-[1px] bg-gradient-to-br ${s.border} to-transparent`}>
      <div className="relative rounded-xl p-6 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 group-hover:shadow-xl">

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </span>

        <h1 className="text-4xl font-semibold mt-2 text-gray-900 dark:text-white">
          {value}
        </h1>

        {/* floating icon */}
        <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${s.bg}`}>
          <Icon size={40} className={s.text} />
        </div>

        {/* glow effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-br ${s.glow} to-transparent`} />

      </div>
    </div>
  );
};

export default StatCard;
