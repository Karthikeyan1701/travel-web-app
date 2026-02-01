import SkeletonBox from "./SkeletonBox";

export default function BookingsSkeleton() {
    return (
        <div>
            {[1, 2, 3].map((i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                    <SkeletonBox width='40%' />
                    <SkeletonBox width='30%' />
                    <SkeletonBox width='100px' height='28px' />
                </div>
            ))}
        </div>
    );
}