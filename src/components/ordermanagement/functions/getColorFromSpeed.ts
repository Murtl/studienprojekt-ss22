export function getColorFromSpeed(speed: number, min: number = 0, max: number = 50) {
    let r, g, b = 0;
    if (speed > max) {
        return("#ff0000")
    }
    if (speed < min) {
        return("#00ff00")
    }
    if(speed < ((max-min)/2)) {
        g = 255;
        r = Math.round(5.1 * speed*(100/max));
    }
    else {
        r = 255;
        g = Math.round(510 - 5.10 * speed*(100/max));
    }
    const h = r * 0x10000 + g * 0x100 + b;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}