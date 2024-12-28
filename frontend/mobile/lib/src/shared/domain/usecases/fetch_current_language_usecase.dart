import 'package:dartz/dartz.dart';

import '../../../core/network/errors/failures.dart';
import '../../../core/usecase/usecase.dart';
import '../repositories/abstract_settings_repository.dart';

class FetchCurrentLanguageUseCase extends UseCase<String, NoParams> {
  final AbstractSettingsRepository _repository;

  FetchCurrentLanguageUseCase(this._repository);

  @override
  Future<Either<Failure, String>> call(NoParams? params) async {
    final result = await _repository.fetchCurrentLanguage();
    return result.fold(
      (failure) => Left(failure),
      (languageCode) => Right(languageCode),
    );
  }
}