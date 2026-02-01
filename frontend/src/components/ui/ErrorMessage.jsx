export default function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div
            style={{
                padding: '10px',
                border: '1px solid #f5c2c7',
                backgroundColor: '#f8d7da',
                color: '#842029',
                borderRadius: '4px',
                marginBottom: '12px'
            }}
        >
            {message}
        </div>
    );
}