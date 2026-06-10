erDiagram

USER ||--o{ RESERVATION : makes
USER ||--o{ ORDER : places
USER ||--o{ PAYMENT : pays

RESTAURANT ||--o{ TABLE : has
TABLE ||--o{ RESERVATION : booked

MENU_CATEGORY ||--o{ MENU_ITEM : contains
MENU_ITEM ||--o{ ORDER_ITEM : used_in

ORDER ||--o{ ORDER_ITEM : contains
ORDER ||--|| PAYMENT : paid_by
