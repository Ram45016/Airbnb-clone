import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                    imageUrl="/images/unauthorized.png"
                />
            </ClientOnly>)
    };
    const reservations = await getReservations({ authorId: currentUser.id });
    if (reservations.length == 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Look like you have no reservations on your properties"
                    imageUrl="/images/reserve.png"
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ReservationsPage;