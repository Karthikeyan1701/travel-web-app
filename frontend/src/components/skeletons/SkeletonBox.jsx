export default function SkeletonBox({
    width = '100%',
    height = '16px',
    style = {},
}) {
    return (
        <div 
            style={{
                width,
                height,
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                marginBottom: '8px',
                ...style
            }}
        />
    );
}