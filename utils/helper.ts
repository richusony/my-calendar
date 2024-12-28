export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export const faviconUrl = "https://t4.ftcdn.net/jpg/07/52/67/23/360_F_752672349_aJ2NUPiRqZJSWKYKEYsluWBBlOpo0tWX.jpg";