import './Login.css';
import { useState } from 'react';
import store from '../store/store';
import { currentDashboardData } from '../store/actions';

const Login = (props: {onLogin: Function}) => {

    const [studentObject, setStudentObject] = useState<{
        studentName: String,
        error: boolean,
        errorMessage: String
    }>({
        studentName: "",
        error: true,
        errorMessage: ""
    })

    const handleNameChange = (event: any) => {
        if(!event.target.value) {
            setStudentObject({...studentObject, studentName: "", error: true, errorMessage: "Name field can't be empty."})
        }
        else {
            setStudentObject({...studentObject, studentName: event.target.value, error: false, errorMessage: ""})
        }
    }

    const handleLogin = () => {
        fetch(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?api_key=keyceFSrv2Fl5qIEu&filterByFormula={Name}="${studentObject.studentName}"`)
        .then((json: Response) => {
            json.json().then((response: {records: Array<any>}) => {
                if(response.records.length) {
                    getClassData(response.records[0]?.fields?.Classes)
                    props.onLogin(true)
                }
                else {
                    setStudentObject({...studentObject, error: true, errorMessage: `No records found for ${studentObject.studentName}`})
                }
            })
        })
    }

    const getClassData = (classList: Array<String>) => {
        //TRIED USING FILTER ON IDS, IT WON'T WORK DIRECTLY UNTIL WE (create a new formula field that displays the record id)

        // let queryString = ""
        // classList.map((item: String, index: Number) => {
        //     if(index == classList.length - 1) {
        //         queryString += `{id}="${item}"`
        //     }
        //     else {
        //         queryString += `{id}="${item}",`
        //     }
        // })
        // fetch(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Classes?api_key=keyceFSrv2Fl5qIEu&filterByFormula=OR(${queryString})`)

        //TAKING ALL THE CLASSES AND STUDENTS

        let classesListObject: any = {}
        let studentsListObject: any = {}

        Promise.all([fetch(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Classes?api_key=keyceFSrv2Fl5qIEu`), fetch(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?api_key=keyceFSrv2Fl5qIEu`)]).then(([classJson, studentsJson]) => {
            Promise.all([classJson.json(), studentsJson.json()]).then(([classResponse, studentsResponse]) => {
                classResponse.records.map((item: {id: any, fields: {Name: String, Students: Array<String>}}) => {
                    classesListObject[item.id] = {
                        className: item.fields.Name,
                        studentsList: item.fields.Students
                    }
                })
                studentsResponse.records.map((item: {id: any, fields: {Name: String}}) => {
                    studentsListObject[item.id] = item.fields.Name
                })
                const dashboardData: any = []
                classList.map((item: any) => {
                    dashboardData.push({
                        className: classesListObject[item].className,
                        studentsList: classesListObject[item].studentsList.map((student: any) => studentsListObject[student]),
                    })
                })
                store.dispatch(currentDashboardData(dashboardData));
            })
        })
    }

    return (
        <div className="parentContainer">
            <div className="loginContainer">
                <div className="inputContainer">
                    <p>Student Name:&nbsp;</p>
                    <input onChange={handleNameChange} />
                </div>
                {studentObject.errorMessage && <p style={{"color": "red", "fontSize": "small", "marginTop": "0.25rem"}}>{studentObject.errorMessage}</p>}
                <button onClick={handleLogin} disabled={studentObject.error}>Login</button>
            </div>
        </div>
    )
}

export default Login;