import React, {useState, useEffect} from "react";
import Modal from '../../Modal';
import './EditStage.css';
import { processEntity } from '../../../../../api/api';

export default function EditStage(props) {
	const { id : stageId , okButtonName = 'Save', onCancel } = props;

	const [stage, setStage] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

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
	}

	const handleSave = () => {
		stage.data.description = description;

		processEntity('PUT', `/stages/${stageId}`, stage)
			.then(response => response.json())
			.then(stage => console.log(stage))
			.catch(err => console.error(err))
			.finally(() => onCancel())
	}

	return (
		<Modal.Content>
			<Modal.Body>
				<input disabled className="stage-title" value={title} onChange={e => setTitle(e.target.value)}/>
				<textarea className="stage-description" placeholder="description..."
						  rows="20" cols="50" value={description}
						  onChange={e => setDescription(e.target.value)}
				/>
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