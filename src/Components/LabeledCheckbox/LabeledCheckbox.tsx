import { InputHTMLAttributes } from 'react';
import styles from './LabeledCheckbox.module.css';

type ILabeledCheckbox = {
	id: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	label: any;
	title?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function LabeledCheckbox({
	id,
	label,
	title,
	...props
}: ILabeledCheckbox) {
	return (
		<div className={styles.labeledCheckbox}>
			<input type='checkbox' id={id} {...props} />
			<label htmlFor={id} title={title}>
				{label}
			</label>
		</div>
	);
}
