export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getColorClass = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-sky-300";
    case "cyan":
      return "bg-cyan-300";
    case "orange":
      return "bg-orange-300";
    case "lime":
      return "bg-green-300";
    case "white":
      return "bg-slate-300";
    case "rebeccapurple":
      return "bg-indigo-300";
    case "red":
      return "bg-red-300";
    default:
      return "";
  }
};
