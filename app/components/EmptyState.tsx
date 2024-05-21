'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    imageUrl?: string;
}

const EmptyState: React.FC<EmptyState> = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters",
    showReset,
    imageUrl
}) => {
    const router = useRouter();
    return (
        <div
            className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center
            "
        >
            {imageUrl && (
                <div className="relative w-64 h-64">
                    <Image
                        src={imageUrl}
                        alt="Empty State Image"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            )}
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            {showReset && (
                <Button
                    outline
                    label="Remove all filters"
                    onClick={() => router.push('/')}
                />
            )}
        </div>
    );
}

export default EmptyState;
