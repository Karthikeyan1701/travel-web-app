import SkeletonBox from "./SkeletonBox";

export default function TravelDetailsSkeleton() {
    return (
        <div>
            <SkeletonBox width='50%' height='24px' />
            <SkeletonBox width='30%' />
            <SkeletonBox width='20%' />
            
            <br />

            <SkeletonBox width='200px' height='32px' />
        </div>
    );
}