import "./ClassCard.css";

const ClassCard = (props: {className: String, students: Array<String>}) => {
    return (
        <div className="classCardContainer">
            <p><strong>Name</strong></p>
            <p>{props.className}</p>
            <p><strong>Students</strong></p>
            <p>{props.students.join(", ")}</p>
        </div>
    )
}

export default ClassCard;