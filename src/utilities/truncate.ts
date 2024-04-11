const MAX_NAME_LENGTH = 25;

export const truncate = (name: String) => {
    if (name.length > MAX_NAME_LENGTH) {
        return name.substring(0, MAX_NAME_LENGTH) + "...";
    } else return name;
}