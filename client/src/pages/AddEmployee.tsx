import { Row } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Employee } from '@prisma/client'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../features/auth/authSlice'
import { useAddEmployeeMutation } from '../app/services/employees'
import { Paths } from '../paths'
import { isErrorWithMessage } from '../utils/is-error-with-message'
import Layout from '../components/Layout'
import EmployeeForm from '../components/EmployeeForm'

const AddEmployee = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [error, setError] = useState('')
  const [addEmployee] = useAddEmployeeMutation()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()

      navigate(`${Paths.status}/created`)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)

      if (maybeError) {
        setError(err.data.message)
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          onFinish={handleAddEmployee}
          title="Добавить сутрудника"
          btnText="Добавить"
          error={error}
        />
      </Row>
    </Layout>
  )
}

export default AddEmployee
