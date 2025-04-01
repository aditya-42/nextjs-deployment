"use client"
import React, { useState } from "react";
import CalendarComponent from "@/components/CalendarComponent/page";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import styles from './style.css';  

const RecruiterDashboard = () => {
    const [events, setEvents] = useState([
      {
        title: "Interview with John Doe",
        start: new Date(),
        end: new Date(new Date().setHours(new Date().getHours() + 1)),
      },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  
    //const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewEvent({ ...newEvent, [name]: value });
    };
  
    const addReminder = (e) => {
      e.preventDefault();
      if (newEvent.title && newEvent.start && newEvent.end) {
        setEvents([...events, {
          ...newEvent,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end)
        }]);
        setNewEvent({ title: '', start: '', end: '' });
        closeModal();
      }
    };
  
    return (
        <>
        <Navbar/>
        <div className={styles.dashboard}>
            <header className={styles.header}>
           
              
            </header>
            <main className={styles.main}>
                <CalendarComponent 
                    events={events} 
                    onEventSelect={(event) => alert(event.title)} 
                />
            </main>
  
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Add New Reminder</h2>
                        <form onSubmit={addReminder}>
                            <div className={styles.formGroup}>
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="start">Start Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    id="start"
                                    name="start"
                                    value={newEvent.start}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="end">End Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    id="end"
                                    name="end"
                                    value={newEvent.end}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.submitButton}>Add Reminder</button>
                                <button type="button" onClick={closeModal} className={styles.cancelButton}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
};
  
export default RecruiterDashboard;
