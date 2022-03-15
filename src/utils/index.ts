export const getProgressImage = (mood?: number) => {
    if (mood === undefined) {
        return 'faceQuestion'
    }
    if (mood >= 90) {
        return 'faceSmile'
    }
    if (mood >= 60) {
        return 'faceNormal'
    }
    return 'faceSad'
}