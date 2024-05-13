export const truncate = (name: String, length=25) => {
    if (name.length > length) {
        return name.substring(0, length) + "...";
    } else return name;
}