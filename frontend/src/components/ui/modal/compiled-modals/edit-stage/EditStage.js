import React, {useState, useEffect} from "react";
import Modal from '../../Modal';
import './EditStage.css';
import { processEntity } from '../../../../../api/api';

export default function EditStage(props) {
	const { okButtonName = 'Save', onCancel, onOk } = props;

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		processEntity('GET', `/stages/${props.id}`)
			.then(response => response.json())
			.then(stage => setStageData(stage))
			.catch(err => console.error(err));
	}, []);

	const setStageData = (stage) => {
		console.log(stage);
		setTitle(stage.data.title);
	}

	const handleSave = () => {
		alert('save')
	}

	return (
		<Modal.Content>
			<Modal.Body>
				<input className="stage-title" value={title} onChange={e => setTitle(e.target.value)}/>
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