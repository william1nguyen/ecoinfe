export const parser = async (markdownContent: string) => {
    const sections = markdownContent.split("\n");
    const results = sections.flatMap(section => section.split("—"));
    return results;
}