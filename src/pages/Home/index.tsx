import React from 'react'
import { Alert, Button, FlatList, View } from "react-native"
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { authService } from '../../services/auth.service'
import { userService } from '../../services/user.service'
import { User } from "../../models/user.model"
import ListItem from '../../components/ListItem'
import CustomButton from '../../components/CustomButton/CustomButton'
import styles from './styles'

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [users, setUsers] = React.useState<User[]>([])
    const [refreshing, setRefreshing] = React.useState(false)

    function fetchUsers() {
        setRefreshing(true)

        userService.getList().then(list => {
            setUsers(list)
            setRefreshing(false)
        }).catch(error => {
            console.error('Erro ao buscar usuários', error)
            navigation.navigate('Login')
        })
    }

    function logOut() {
        authService.logOut()
        navigation.navigate('Login')
    }

    React.useEffect(() => {
        fetchUsers()
    }, [])

    function goToNewUser() {
        navigation.navigate('User')
    }

    function goToRoles() {
        navigation.navigate('Roles')
    }
    function update(user: User) {
        navigation.navigate('EditUser', user)
    }

    function remover(id: number) {
        userService.delete(id).then(isDelete => {
            if (isDelete) fetchUsers()
            else Alert.alert('Usuário não existe')
        })
    }

    return (
        <View style={styles.container}>
          <FlatList
            onRefresh={fetchUsers}
            refreshing={refreshing}
            data={users}
            keyExtractor={user => user.username}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                subTitle={item.username}
                onEdit={() => update(item)}
                onRemove={() => remover(item.id!)}
              />
            )}
          />
    
          <View style={styles.buttonContainer}>
            <CustomButton title="Roles" onPress={goToRoles} color="#0000FF" />
            <CustomButton title="Add" onPress={goToNewUser} color="#0000FF" />
            <CustomButton title="Sair" onPress={logOut} color="#0000FF" />
          </View>
        </View>
      );
}