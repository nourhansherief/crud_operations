import { fakeAsync } from '@angular/core/testing';
import { async, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from "src/app/core/services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";


describe('', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,RouterTestingModule.withRoutes([])
            ],
            providers: [
                AuthService
            ],
        });
        service = TestBed.get(AuthService);
        httpMock = TestBed.get(HttpTestingController);
    });
    it("should create", () => {
        expect(AuthService).toBeDefined();
    });

    it('should login user on the server', fakeAsync(() => {
        const user = {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
        service.login(user)
            .subscribe((users: any) => {
                expect(users.token).toBeDefined();
            });
        tick();
        const requests = httpMock.match({ method: 'post' });
        expect(requests[0].request.method).toBe("POST");
    }));


});
