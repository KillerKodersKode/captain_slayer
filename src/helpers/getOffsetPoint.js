// Angle is in degrees.
export default function getOffsetPoint (x, y, angle, distance) {
    const newX = x + Math.cos(Math.radians(angle)) * distance
    const newY = y + Math.sin(Math.radians(angle)) * distance
    return { x: newX, y: newY }
}
