export default function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role='alert'>
            <h2>Something went wrong.</h2>

            <pre className='text-red-600'>
                {error.message}
            </pre>

            <button onClick={resetErrorBoundary}>
                Try Again
            </button>
        </div>
    );
}