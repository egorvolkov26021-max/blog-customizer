import { ArrowButton } from 'src/ui/arrow-button';
import clsx from 'clsx';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useState } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const switchOpen = () => setIsOpen((isOpen) => !isOpen);
	const [formState, setFormState] = useState(defaultArticleState);
	const applyStyle = (params: ArticleStateType) => {
		const main = document.querySelector('main');
		if (main) {
			main.style.setProperty('--font-family', params.fontFamilyOption.value);
			main.style.setProperty('--font-size', params.fontSizeOption.value);
			main.style.setProperty('--font-color', params.fontColor.value);
			main.style.setProperty('--container-width', params.contentWidth.value);
			main.style.setProperty('--bg-color', params.backgroundColor.value);
		}
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		applyStyle(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		applyStyle(defaultArticleState);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={switchOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit} >
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
					/>

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
