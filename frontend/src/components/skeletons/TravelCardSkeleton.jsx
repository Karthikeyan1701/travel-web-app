import SkeletonBox from "./SkeletonBox";

export default function TravelCardSkeleton() {
    return (
        <div style={{ border: '1px solid #ddd', padding: '12px', marginBottom: '12px' }}>
            <SkeletonBox width='60%' height='20px' />
            <SkeletonBox width='40%' />
            <SkeletonBox width='30%' />
            <SkeletonBox width='80px' height='32px' />
        </div>
    );
}