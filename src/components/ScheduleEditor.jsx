import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

export const ScheduleEditor = ({ schedules, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('weekday');
    const [editingSchedule, setEditingSchedule] = useState(schedules[activeTab]);

    const handleScheduleChange = (index, field, value) => {
        const updated = [...editingSchedule];
        updated[index] = { ...updated[index], [field]: value };
        setEditingSchedule(updated);
    };

    const addActivity = () => {
        setEditingSchedule([
            ...editingSchedule,
            { time: '', activity: '', details: '', purpose: '' }
        ]);
    };

    const removeActivity = (index) => {
        setEditingSchedule(editingSchedule.filter((_, i) => i !== index));
    };

    const saveSchedule = () => {
        onUpdate(activeTab, editingSchedule);
        alert('Schedule saved successfully!');
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setEditingSchedule(schedules[tab]);
    };

    return (
        <div className="schedule-editor">
            <div className="editor-header">
                <h2>Edit Schedule</h2>
                <div className="tab-buttons">
                    <button
                        className={activeTab === 'weekday' ? 'active' : ''}
                        onClick={() => switchTab('weekday')}
                    >
                        Weekday
                    </button>
                    <button
                        className={activeTab === 'weekend' ? 'active' : ''}
                        onClick={() => switchTab('weekend')}
                    >
                        Weekend
                    </button>
                </div>
            </div>

            <div className="editor-content">
                {editingSchedule.map((activity, index) => (
                    <div key={index} className="editor-row">
                        <input
                            type="text"
                            placeholder="Time (e.g., 5:00 – 5:20)"
                            value={activity.time}
                            onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Activity"
                            value={activity.activity}
                            onChange={(e) => handleScheduleChange(index, 'activity', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Details"
                            value={activity.details}
                            onChange={(e) => handleScheduleChange(index, 'details', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Purpose"
                            value={activity.purpose}
                            onChange={(e) => handleScheduleChange(index, 'purpose', e.target.value)}
                        />
                        <button className="delete-btn" onClick={() => removeActivity(index)}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="editor-actions">
                <button className="add-btn" onClick={addActivity}>
                    <Plus size={18} /> Add Activity
                </button>
                <button className="save-btn" onClick={saveSchedule}>
                    <Save size={18} /> Save Schedule
                </button>
            </div>
        </div>
    );
};
