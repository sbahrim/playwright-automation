import {Reporter, Suite } from '@playwright/test/reporter'
import * as fs from 'fs'

class MyReporter implements Reporter {
    onBegin(config, suite) {
        console.log(`Execution of ${suite.allTests().length} tests.` )
    }

    onEnd(result) {
        console.log(`Execution finished with status of ${result.status}.`)
    }

    onTestBegin(test) {
        console.log(`Execution of ${test.title} started.`)
    }

    //exctract test details
    onTestEnd(test, result) {
        const execTime = result.duration
        
        const data = {
            test: test.title,
            status: result.status,
            executionTime: execTime,
            errors: result.errors,
        }

        const dataToString = JSON.stringify(data,null,2)
        console.log(dataToString)
        
        //write data to file
        fs.writeFileSync('tests-results.json',dataToString)
    }
}

export default MyReporter