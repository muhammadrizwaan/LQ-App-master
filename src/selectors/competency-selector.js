export default (competencies, { text }) => {
    return competencies
        .filter(competency => {
            const nameMatch = competency.name.toLowerCase().includes(text.toLowerCase());

            return nameMatch
        })
}