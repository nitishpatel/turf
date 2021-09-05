from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
import random
import re
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
# Create your views here.
from verify_email.email_handler import send_verification_email


def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)])for _ in range(length))


@csrf_exempt
def signin(request):
    if not request.method == "POST":
        return JsonResponse({
            'error': 'SEND A POST request with  Valid Parameters Only'
        })

    username = request.POST['email']
    password = request.POST['password']

    if not re.match(r"\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b", username):
        return JsonResponse({
            'error': 'Enter a valid email'
        })

    if len(password) < 5:
        return JsonResponse({
            'error': 'Password need to be atleast pf 3 Characters'
        })

    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(email=username)
        if (user.check_password(password)):
            usr_dict = UserModel.objects.filter(
                email=username).values().first()
            usr_dict.pop('password')

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({
                    'error': 'Previous Session Exists'
                })

            token, created = Token.objects.get_or_create(user=user)
            user.session_token = token.key
            user.save()
            login(request, user)
            return JsonResponse({
                'token': token.key,
                'user': usr_dict
            })
        else:
            return JsonResponse({
                'error': 'Invalid Password'
            })
    except UserModel.DoesNotExist:
        return JsonResponse({
            'error': 'Invalid Email'
        })

# @csrf_exempt


def signout(request, id):
    logout(request)
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()

    except UserModel.DoesNotExist:
        return JsonResponse({
            'error': 'Invalid user id'
        })
    return JsonResponse({
        'success': 'Logged Out Success'
    })


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return []
