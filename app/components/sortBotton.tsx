import { useRef, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, View, ViewStyle, Text, Dimensions } from "react-native"
import { useThemesColors } from "./hooks/useThemesColors";
import ThemedText from "./themedText";
import { Card } from "./card";
import Row from "./row";
import Radio from "./radio";

type Props = {
    value: 'id' | 'name',
    onChange: (v:'id'|'name') => void;
}


export default function SortBotton({value, onChange}:Props){
    const colors = useThemesColors()
    const [isVisible, setVisibility] =useState(false)
    const buttonRef = useRef<View>(null)
    const [position, setPosition] = useState<null|{top:number,right:number}>(null)
    const options = [
        {id:1,label:"Number", value:'id'},
        {id:2,label:"Alpha", value:'name'}
    ] as const

    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x,y,width,height)=>{
            setPosition({
                top: y + height ,
                right: Dimensions.get("window").width - x - width
            })
            console.log(position)
            setVisibility(true)
        })
    }
    const onClose = () =>{
        setVisibility(false)
    }

    return <>
    
        <Pressable onPress={onButtonPress}>
            <View 
            ref={buttonRef}
            style={styles.shorter}>
            <Image source={
                value==="id"?
                require("@/assets/images/tag.png"):
                require("@/assets/images/text_format.png")
            }
            width={16}
            height={16}
            />
        </View>
        </Pressable>
        <Modal transparent visible={isVisible} onRequestClose={onClose} >
            <Pressable onPress={onClose} style={styles.backdrop}>
                <View style={[styles.popup, {backgroundColor:colors.primary, ...position}]}>
                    <ThemedText color="white" variant="subtitle2" style={styles.popTitle}>Sort By:</ThemedText>
                    <Card style={styles.card}>
                        {options.map(o =>
                            <Pressable key={o.id} onPress={()=>onChange(o.value)}>
                                <Row key={o.id} gap={12}>
                                    <Radio checked={value===o.value} />  
                                    <ThemedText>{o.label}</ThemedText>
                                </Row>
                            </Pressable>
                        )}
                    </Card>
                </View>
            </Pressable>
        </Modal>
    
    </>
    
}

const styles = StyleSheet.create({
    shorter:{
        backgroundColor:"#ffffff",
        width:32,
        height:32,
        borderRadius:16,
        flex:0,
        alignItems:"center",
        justifyContent:"center"
    },
    backdrop:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.3)",
        position:"relative"
    },
    popup:{
        position:"absolute",
        borderRadius:12,
        padding:4,
        width:200,
        // top:5,
        // right:5

    },
    popTitle:{
        paddingHorizontal:16,
        paddingVertical:12
    },
    card:{
        paddingVertical:16,
        paddingHorizontal:20,
        gap:16
    }


} )