import { useParams } from "react-router-dom"

export default function TravelDetails() {
    const { id } = useParams();

    return (
        <div>
            <h1>Travel Details Page</h1>
            <p>Travel ID: {id}</p>
        </div>
    );
}