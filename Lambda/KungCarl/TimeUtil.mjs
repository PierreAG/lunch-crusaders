function getSwedishDay() {
    const daysOfWeekSwedish = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    const dayOfWeek = new Date().getDay();

    return daysOfWeekSwedish[dayOfWeek];
}

function weekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;

    return Math.floor(diff / oneWeek) + 1;
}

function yearNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);

    return start.getFullYear() + 1
}

export { getSwedishDay, weekNumber, yearNumber };
