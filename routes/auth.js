const express = require('express') // повторно для роутера
const router = express.Router() // Роутер для импорта в server.js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const { isEmpty } = require('validator')
const { error } = require('console')

router.post(
	'/register',
	[
		body('email').isEmail().withMessage('Неверный формат почты'),
		body('password')
			.isLength({ min: 8 })
			.withMessage('Пароль должен быть минимум 8 символов'),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const { email, password } = req.body
		try {
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(password, salt)

			await User.create({ email, password: hashedPassword })
			res.json({ message: 'Пользователь зарегистрирован' })
		} catch (err) {
			console.error('Ошибка базы данных', err)
			res.status(500).json({ error: 'Ошибка при создании пользователя' })
		}
	}
)

router.post(
	'/login',
	[
		body('email').isEmail().withMessage('Неверный формат почты'),
		body('password').notEmpty().withMessage('Пароль обязателен'),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			const user = await User.findOne({ where: { email } })

			if (!user) {
				return res.status(400).json({ error: 'Пользователь не найден' })
			}

			const isPasswordValid = await bcrypt.compare(password, user.password)

			if (isPasswordValid) {
				return res.json({ message: 'Авторизация успешна' })
			} else {
				return res.status(401).json({ error: 'Неверный пароль!' })
			}
		} catch (err) {
			console.error('Ошибка базы данных', err)
			res.status(500).json({ error: 'Ошибка при создании пользователя' })
		}
	}
)

module.exports = router
