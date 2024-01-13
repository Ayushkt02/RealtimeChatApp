import React from "react";
import{Grid, Form, Segment} from 'semantic-ui-react'

const Register = ()=>{



    return (
        <Grid verticalAlign="middle" textAlign="center">
            <Grid.Column>
                <Form>
                    <Segment stacked>
                        <Form.Input name="Username" value="" icon="user" iconPosition="left"/>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default Register;