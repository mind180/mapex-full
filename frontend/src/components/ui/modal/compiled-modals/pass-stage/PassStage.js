import React, {useState, useEffect} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from '../../Modal';
import './PassStage.css';
import { processEntity } from '../../../../../api/api';

export default function EditStage(props) {
	const { id : stageId , okButtonName = 'Save' } = props;

	const [stage, setStage] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('None');

	useEffect(() => {
		processEntity('GET', `/stages/${stageId}`)
			.then(response => response.json())
			.then(stage => setStageData(stage))
			.catch(err => console.error(err));
	}, []);

	const setStageData = (stage) => {
		setStage(stage);
		setTitle(stage.data.title);
		setDescription(stage.data.description);
		setStatus(stage.data.status);
	}

	const handleChangeStatus = (e) => {
		const status = e.target.value;

		processEntity('PUT', `/stages/${stageId}/status`, { status })
			.then(response => response.json())
			.then(res => {
				setStatus(status);
				props.onChangeStatus(stageId, status);
			})
			.catch(err => console.error(err))
	}

	const quillStyle = {
		minHeight: '400px'
	}

	return (
		<Modal.Content>
			<Modal.Body>
				<input disabled className="stage-title" value={title} onChange={e => setTitle(e.target.value)}/>
				<ReactQuill readOnly={true} theme={null} style={quillStyle} value={description} onChange={setDescription} />
				<div className="pass-stage-status">
					<label>Status:</label>
					<select onChange={handleChangeStatus} value={status}>
						<option value="None">None</option>
						<option value="InProgress">⏩In progress</option>
						<option value="Done">✔️Done</option>
						<option value="Canceled">❌Cenceled</option>
					</select>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Modal.PrimaryButton action={props.onOk}>
					{okButtonName}
				</Modal.PrimaryButton>
			</Modal.Footer>
		</Modal.Content>
	)
}