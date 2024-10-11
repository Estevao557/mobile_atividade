import React from 'react';
import { Alert, Button, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Roles } from "../../models/roles.model";
import { rolesService } from '../../services/roles.service';
import styles from './styles';
import MyInput from '../../components/MyInput';

export default function NewRolesPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        navigation.setOptions({ title: 'Nova Role' });
    }, [navigation]);

    const save = async () => {
        if (!name.trim()) {
            Alert.alert('Erro', 'O Nome é obrigatório');
            return;
        }

        if (!description.trim()) {
            Alert.alert('Erro', 'A Descrição é obrigatória');
            return;
        }

        try {
            await rolesService.create({ name, description });
            navigation.goBack();
        } catch (error: any) {
            if (error?.status === 400) {
                Alert.alert('Erro', 'Role já existe!');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro. Você será redirecionado ao login.');
                navigation.navigate('Login');
            }
        }
    };

    return (
        <View style={styles.page}>
            <MyInput 
                label='Nome da Role' 
                initialValue={name} 
                change={setName} 
            />
            <MyInput 
                label='Descrição' 
                change={setDescription} 
            />

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} color="#0000FF" />
            </View>
        </View>
    );
}
