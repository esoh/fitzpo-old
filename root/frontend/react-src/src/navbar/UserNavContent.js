import React from 'react';
import { Link } from "react-router-dom";

export default function UserNavContent(props){
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/exercise-logs'>My Logs</Link>
        </div>
    )
}
