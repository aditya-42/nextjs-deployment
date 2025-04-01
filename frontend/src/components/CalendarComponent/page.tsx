import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        start: moment().toDate(),
        end: moment().toDate(),
        url: "",
    });
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Load events from localStorage on component mount
    useEffect(() => {
        const savedEvents = localStorage.getItem("events");
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        }
    }, []);

    // Open and close modals
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewEvent({
            title: "",
            start: moment().toDate(),
            end: moment().toDate(),
            url: "",
        });
    };

    const closeDetailsModal = () => setIsDetailsModalOpen(false);

    // Handle form inputs
    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleDateChange = (dateType, date) => {
        setNewEvent({ ...newEvent, [dateType]: date });
    };

    // Save event
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newEvent.title && newEvent.start && newEvent.end) {
            const updatedEvents = [...events, newEvent];
            setEvents(updatedEvents);
            localStorage.setItem("events", JSON.stringify(updatedEvents)); // Save to localStorage
            closeModal();
        } else {
            alert("Please fill in all fields.");
        }
    };

    // Handle event click
    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsDetailsModalOpen(true);
    };

    // Style events
    const eventStyleGetter = useCallback(
        (event) => {
            const backgroundColor = event.color ? event.color : "#3174ad";
            return { style: { backgroundColor, color: "white", opacity: 0.8 } };
        },
        []
    );

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h2>Calendar</h2>
                <button className="addButton bg-[#6A38C2]" onClick={openModal}>Add Event</button>
            </div>
            <div style={{ height: "500px" }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={{ month: true, week: true, day: true }}
                    defaultView={Views.MONTH}
                    style={{ height: "100%" }}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyleGetter}
                />
            </div>

            {/* Add Event Modal */}
            {isModalOpen && (
                <div className="modalOverlay">
                    <div className="modal">
                        <h2>Add New Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" value={newEvent.title} onChange={handleInputChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="start">Start Date</label>
                                <input type="datetime-local" id="start" name="start" value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")} onChange={(e) => handleDateChange("start", moment(e.target.value).toDate())} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="end">End Date</label>
                                <input type="datetime-local" id="end" name="end" value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")} onChange={(e) => handleDateChange("end", moment(e.target.value).toDate())} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="url">Event URL</label>
                                <input type="url" id="url" name="url" value={newEvent.url} onChange={handleInputChange} placeholder="https://example.com" />
                            </div>
                            <div className="modalActions">
                                <button type="submit" className="submitButton">Save</button>
                                <button type="button" className="cancelButton" onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Event Details Modal */}
            {isDetailsModalOpen && selectedEvent && (
                <div className="modalOverlay">
                    <div className="modal">
                        <h2>Event Details</h2>
                        <p><strong>Title:</strong> {selectedEvent.title}</p>
                        <p><strong>Start:</strong> {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm a")}</p>
                        <p><strong>End:</strong> {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm a")}</p>
                        {selectedEvent.url && (
                            <p><strong>URL:</strong> <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer">Open Event</a></p>
                        )}
                        <div className="modalActions">
                            <button type="button" className="cancelButton" onClick={closeDetailsModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;
