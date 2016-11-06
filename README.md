# departure_times

Relatively simple web app to show prominent commuter rail departure times from North and South Station in Boston.

The app is built with PostgreSQL, Flask, Webpack, and ReactJS with Google Maps to display destination markers.
Data is pulled from a constantly updating CSV file served by the MBTA, and station GPS locations were pulled from their developer portal.

The departure data is stored in a database table and queried against by SQLAlchemy in Flask when the page is accessed, interacted with, or refreshed.
GPS data is stored in a separate table that gets joined to the departure data asynchronously.

Query results get passed through the Jinja2 templating engine into arrays of Javascript objects that are handled by ReactJS to provide the front end.
