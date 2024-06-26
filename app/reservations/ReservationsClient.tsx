'use client';
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}
const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router=useRouter();

    const [deletingId, setDeletingId] = useState('');

    const onCancle = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled');
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);
    return (
        <Container>
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {reservations.map((reservation) => {
                    return (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancle}
                            disabled={deletingId===reservation.id}
                            actionLabel="Cancel Guest Reservation"
                            currentUser={currentUser}
                        />
                    );
                })}

            </div>
        </Container>
    );
}

export default ReservationsClient;