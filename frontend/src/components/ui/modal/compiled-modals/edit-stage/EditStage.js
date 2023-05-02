import React, {useState, useEffect} from "react";
import Modal from '../../Modal';
import './EditStage.css';
import { processEntity } from '../../../../../api/api';

export default function EditStage(props) {
	const { id : stageId , okButtonName = 'Save', onCancel } = props;

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

	const handleSave = () => {
		stage.data.description = description;

		processEntity('PUT', `/stages/${stageId}`, stage)
			.then(response => response.json())
			.then(stage => console.log(stage))
			.catch(err => console.error(err))
			.finally(() => onCancel())
	}

	const handleChangeStatus = (e) => {
		const status = e.target.value;
		console.log(status);

		processEntity('PUT', `/stages/${stageId}/status`, { status })
			.then(response => response.json())
			.then(stage => setStatus(status))
			.catch(err => console.error(err))
	}

	return (
		<Modal.Content>
			<Modal.Body>
				<input disabled className="stage-title" value={title} onChange={e => setTitle(e.target.value)}/>
				<textarea className="stage-description" placeholder="description..."
						  rows="20" cols="50" value={description}
						  onChange={e => setDescription(e.target.value)}
				/>
				<div>
					<label>Status:</label>
					<select name="status" id="status" onChange={handleChangeStatus} value={status}>
						<option value="None">None</option>
						<option value="InProgress">In progress</option>
						<option value="Done">Done</option>
						<option value="Canceled">Cenceled</option>
					</select>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Modal.PrimaryButton action={onCancel}>
						Cancel
				</Modal.PrimaryButton>
				<Modal.PrimaryButton action={handleSave}>
					{okButtonName}
				</Modal.PrimaryButton>
			</Modal.Footer>
		</Modal.Content>
	)
}