import './Dashboard.css';
import { useState } from 'react';
import store from '../store/store';
import { login } from '../store/actions';
import ClassCard from '../ClassCard/ClassCard';

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState<any>([]);

    store.subscribe(() => {
        setDashboardData(store.getState().dashboardData)
    })

    const handleLogout = () => {
        store.dispatch(login(false))
    }

    return (
        <div className="dashboardParentContainer">
            <button className="logoutButton" onClick={handleLogout}>Logout</button> 
            <div className="classListContainer">
                {
                    dashboardData.map((item: {className: String, studentsList: Array<String>}, index: any) => <ClassCard key={index} className={item.className} students={item.studentsList} />)
                }
            </div>
        </div>
    )
}

export default Dashboard;