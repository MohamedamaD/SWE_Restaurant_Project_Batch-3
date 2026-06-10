flowchart LR

Customer((Customer))
Admin((Admin))

Customer --> Register
Customer --> Login
Customer --> BrowseMenu
Customer --> MakeReservation
Customer --> PlaceOrder
Customer --> PayOrder

Admin --> ManageMenu
Admin --> ManageTables
Admin --> ManageReservations
Admin --> ViewOrders
