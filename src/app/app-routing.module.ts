import { NgModule} from '@angular/core'
import { Routes , RouterModule} from '@angular/router' 
import { FinalResultComponent } from './final-result/final-result.component'

const routes: Routes = [
    { path: 'standings' , component: FinalResultComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes )],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [FinalResultComponent]
