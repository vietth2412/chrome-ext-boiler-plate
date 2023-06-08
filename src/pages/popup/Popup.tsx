import React, { useEffect, useState } from "react";
import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";
import { getAssets, IAddTimesheetParams } from "@src/api";
import { syncData } from "./service";
import dayjs from 'dayjs';

const Popup = () => {
  
  const [projects, setProjects] = useState([])
  const [activities, setActivities] = useState([])
  const [form, setForm] = useState(null)
  useEffect(() => {
    getAssetsData()
  }, [])
  const getAssetsData = async () => {
    const data = await syncData()
    setActivities(data.activities)
    setProjects(data.projects)
    const initForm = {
      projectId: data.projects[0]?.value,
      activityId: 2,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
      timeSlot: 'wholeDay'
    }
    setForm(initForm)
  }
  const changeFormData = (field, value) => {
    console.log(`${field}:`, value);

    setForm({
      ...form,
      [field]: value
    })
  }
  const submit = () => {
    const requestArr = [];
    const diffDate = dayjs(form.endDate).diff(dayjs(form.startDate), 'day');

    for (let i = 0; i < diffDate + 1; i++) {
      const baseParams = {
        projectID: form.projectId,
        activityID: form.activityId,
        start_day: dayjs(form.startDate, 'YYYY-MM-DD').add(i, 'day').format('DD.MM.YYYY'),
        end_day: dayjs(form.startDate, 'YYYY-MM-DD').add(i, 'day').format('DD.MM.YYYY'),
        userID: [757521802],
      }
      const requestMorning: IAddTimesheetParams = {
        ...baseParams,
        start_time: '09:00:00',
        end_time: '12:00',
        duration: '03:00:00',
      }
      const requestAfternoon: IAddTimesheetParams = {
        ...baseParams,
        start_time: '13:00:00',
        end_time: '18:00',
        duration: '05:00:00',
      }
      const weekday = new Date(dayjs(baseParams.start_day, 'DD.MM.YYYY').toDate()).getDay()
      console.log(`${baseParams.start_day}:`,weekday);


      if (form.timeSlot == 'morning' || form.timeSlot == 'wholeDay') {
        requestArr.push(requestMorning)
      }
      if (form.timeSlot == 'afternoon' || form.timeSlot == 'wholeDay') {
        requestArr.push(requestAfternoon)
      }
    }
    console.log('requestArr:', requestArr)
  }
  return (
    <div className="App">
      <select
        value={form?.projectId}
        onChange={(e) => changeFormData('projectId', e.target.value)}
        className="bg-gray-50 border rounded-lg  w-full p-2.5 mb-4">
        {projects.map(p => <option value={p.value} key={p.id}>{p.label}</option>)}
      </select>
      <select
        value={form?.activityId}
        onChange={(e) => changeFormData('activityId', e.target.value)}
        className="bg-gray-50 border rounded-lg  w-full p-2.5 mb-4">
        {activities.map(a => <option value={a.value} key={a.id}>{a.label}</option>)}
      </select>

      <div className="mb-4 flex items-center">
        <label className="">From</label>
        <input type="date"
          onChange={(e) => changeFormData('startDate', e.target.value)}
          value={form?.startDate}
          className="bg-gray-50 border rounded-lg  w-full p-2.5 mb-4" />
      </div>

      <div className="mb-4 flex items-center">
        <label className="">To</label>
        <input type="date"
          onChange={(e) => changeFormData('endDate', e.target.value)}
          value={form?.endDate}
          className="bg-gray-50 border rounded-lg  w-full p-2.5 mb-4" />
      </div>


      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            checked={form?.timeSlot == 'morning'}
            onChange={e => changeFormData('timeSlot', e.target.value)}
            id="morning" type="radio" value="morning" name="timeSlot" className="mr-1" />
          <label htmlFor="morning" >Morning </label>
        </div>
        <div className="flex items-center">
          <input
            checked={form?.timeSlot == 'afternoon'}
            onChange={e => changeFormData('timeSlot', e.target.value)}
            id="afternoon" type="radio" value="afternoon" name="timeSlot" className="mr-1" />
          <label htmlFor="afternoon" >Afternoon </label>
        </div>
        <div className="flex items-center">
          <input
            checked={form?.timeSlot == 'wholeDay'}
            onChange={e => changeFormData('timeSlot', e.target.value)}
            id="wholeDay" type="radio" value="wholeDay" name="timeSlot" className="mr-1" />
          <label htmlFor="wholeDay" >Whole Day </label>
        </div>
      </div>
      <button className="text-white bg-blue-700 rounded-lg px-5 py-2.5 m-auto" onClick={submit}>Submit</button>
    </div>
  );
};

export default Popup;
